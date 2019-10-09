import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitComponent } from './instit.component';

describe('InstitComponent', () => {
  let component: InstitComponent;
  let fixture: ComponentFixture<InstitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
