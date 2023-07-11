import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyComtttComponent } from './my-comttt.component';

describe('MyComtttComponent', () => {
  let component: MyComtttComponent;
  let fixture: ComponentFixture<MyComtttComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyComtttComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyComtttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
